//// Responsável por armazenar as informações dos hóspedes
// Namespace: é uma maneira de organizar o código em grupos, como pastas,para facilitar a leitura e manutenção

    namespace BarAPI.Models{
    public class Mesa{
        public int Id { get; set; } // Id da mesa.
        public int Numero { get; set; } // Número da mesa.
        public int Capacidade { get; set; } // Capacidade máxima de pessoas na mesa.
        public bool Ocupada { get; set; } // Verifica se a mesa está ocupada ou não.
    }
}
