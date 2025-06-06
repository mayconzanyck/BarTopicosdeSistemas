namespace BarAPI.Models{
    public class Bebida{
        public int Id { get; set; } // Id da bebida.
        public string Nome { get; set; } = string.Empty; // Nome da bebeida.
        public decimal Preco { get; set; } // Preço da bebida.
        public bool Alcoolica { get; set; } // Define se é alcoólica ou não alcoólica.
    }
}
