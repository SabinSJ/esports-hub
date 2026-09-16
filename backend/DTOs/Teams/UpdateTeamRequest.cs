using System.ComponentModel.DataAnnotations;

namespace backend.DTOs.Teams;

public class UpdateTeamRequest
{
    [Required]
    [StringLength(100, MinimumLength = 2)]
    public string Name { get; set; } = string.Empty;
    
    [Required]
    [StringLength(100, MinimumLength = 2)]
    public string Country { get; set; } = string.Empty;

    
    [Required]
    [StringLength(100, MinimumLength = 2)]
    public string Region { get; set; } = string.Empty;
    
    [Required]
    [Url]
    public string LogoUrl { get; set; } = string.Empty;
}