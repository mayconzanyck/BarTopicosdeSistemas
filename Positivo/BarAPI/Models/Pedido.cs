using System.ComponentModel.DataAnnotations.Schema;

namespace BarAPI.Models{
    public class Pedido{
        
        
        public int Id { get; set; } // Id do pedido.

        public int ClienteId { get; set; } // Id do cliente que fez o pedido.
        public Cliente? Cliente { get; set; } // Navegação para a entidade cliente.

        public int BebidaId { get; set; } // Id da pedida feita no pedido.
        public Bebida? Bebida { get; set; } // Navegação para a entidade Bebida.

        public DateTime DataPedido { get; set; } = DateTime.Now; // Data e hora do pedido realizado.
    }
}
