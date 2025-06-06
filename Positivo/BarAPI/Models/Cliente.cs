namespace BarAPI.Models{
    public class Cliente{
        
        public int Id { get; set; } // Id do cliente.
        public string Nome { get; set; } = string.Empty; // Nome do cliente.
        public DateTime DataNascimento { get; set; } // Data de nascimento do cliente.

        // Calcula a idade automaticamente com base na data de nascimento.
        public int Idade => DateTime.Today.Year - DataNascimento.Year -
                            (DateTime.Today.DayOfYear < DataNascimento.DayOfYear ? 1 : 0);
    }
}
