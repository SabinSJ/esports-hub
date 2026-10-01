using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;

namespace backend.Extensions;

public static class AuthenticationExtensions
{
    public static IServiceCollection AddCustomAuthentication(this IServiceCollection services, IConfiguration configuration)
    {
        var jwtKey = configuration["Jwt:Key"];

        services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
        .AddJwtBearer(options =>
        {
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey!)),
                ValidateIssuer = true,
                ValidIssuer = configuration["Jwt:Issuer"],
                ValidateAudience = true,
                ValidAudience = configuration["Jwt:Audience"],
                ValidateLifetime = true,
                ClockSkew = TimeSpan.Zero
            };

            options.Events = new JwtBearerEvents
            {
                OnMessageReceived = context =>
                {
                    var accessToken = context.Request.Cookies["token"];
                    if (!string.IsNullOrEmpty(accessToken))
                    {
                        context.Token = accessToken;
                    }
                    return Task.CompletedTask;
                }
            };
        })
        .AddCookie("External")
        .AddGoogle(options =>
        {
            options.ClientId = configuration["Authentication:Google:ClientId"]!;
            options.ClientSecret = configuration["Authentication:Google:ClientSecret"]!;
            options.CallbackPath = "/api/auth/google/callback";
            options.SignInScheme = "External";
        })
        .AddGitHub(options =>
        {
            options.ClientId = configuration["Authentication:GitHub:ClientId"]!;
            options.ClientSecret = configuration["Authentication:GitHub:ClientSecret"]!;
            options.CallbackPath = "/api/auth/github/callback";
            options.SignInScheme = "External"; 

            options.Scope.Add("user:email");
            options.ClaimActions.MapJsonKey(ClaimTypes.Email, "email");

            options.Events = new Microsoft.AspNetCore.Authentication.OAuth.OAuthEvents
            {
                OnRedirectToAuthorizationEndpoint = context =>
                {
                    var uriBuilder = new UriBuilder(context.RedirectUri);
                    uriBuilder.Scheme = "https";
                    context.Response.Redirect(uriBuilder.ToString());
                    return Task.CompletedTask;
                },
                
                OnCreatingTicket = async context =>
                {
                    if (!context.Identity!.HasClaim(c => c.Type == ClaimTypes.Email))
                    {
                        var request = new HttpRequestMessage(HttpMethod.Get, "https://github.com");
                        request.Headers.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", context.AccessToken);
                        request.Headers.UserAgent.Add(new System.Net.Http.Headers.ProductInfoHeaderValue("YourAppName", "1.0"));

                        var response = await context.Backchannel.SendAsync(request, context.HttpContext.RequestAborted);
                        if (response.IsSuccessStatusCode)
                        {
                            using var doc = await System.Text.Json.JsonDocument.ParseAsync(await response.Content.ReadAsStreamAsync());
                            var primaryEmail = doc.RootElement.EnumerateArray()
                                .FirstOrDefault(e => e.GetProperty("primary").GetBoolean()).GetProperty("email").GetString() 
                                ?? doc.RootElement.EnumerateArray().FirstOrDefault().GetProperty("email").GetString();

                            if (!string.IsNullOrEmpty(primaryEmail))
                            {
                                context.Identity.AddClaim(new Claim(ClaimTypes.Email, primaryEmail));
                            }
                        }
                    }
                }
            };
        });

        services.AddAuthorization();

        return services;
    }
}
