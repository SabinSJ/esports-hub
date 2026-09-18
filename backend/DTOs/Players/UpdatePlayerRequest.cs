using backend.Enums;
using System.ComponentModel.DataAnnotations;

namespace backend.DTOs.Players;

public class UpdatePlayerRequest
{
    [Required]
    [StringLength(100, MinimumLength = 2)]
    public string Name { get; set; } = string.Empty;

    public TeamRole TeamRole { get; set; }

    [Required]
    [StringLength(100, MinimumLength = 2)]
    public string Nationality { get; set; } = string.Empty;

    [Required]
    [Url]
    public string ImageUrl { get; set; } = string.Empty;

    [Required]
    public int TeamId { get; set; }
}