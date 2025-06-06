using Microsoft.EntityFrameworkCore;

namespace BarAPI.Models{

    // Responsável por gerenciar as entidades no banco.
    public class AppDataContext : DbContext{
        
        public AppDataContext(DbContextOptions<AppDataContext> options) : base(options) { }

        // Define as tabelas do banco de dados mapeadas pelas entidades.
        public DbSet<Bebida> Cardapio { get; set; }
        public DbSet<Cliente> Clientes { get; set; }
        public DbSet<Pedido> Pedidos { get; set; }
        public DbSet<Mesa> Mesas { get; set; }
    }
}