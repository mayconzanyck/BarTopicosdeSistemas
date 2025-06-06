// Esse arquivo faz a implementação do controlador de mesas, que gerencia as operações CRUD (Criar, Ler, Atualizar e Deletar) para a entidade Mesa.
// Ele permite que o cliente interaja com as mesas do bar, como cadastrar novas mesas, liberar mesas ocupadas e remover mesas do sistema.
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BarAPI.Models;

namespace BarAPI.Controllers{

    [Route("api/[controller]")]
    [ApiController]
    public class MesasController : ControllerBase{

        // Banco de dados, necessário para acessar as entidades.
        private readonly AppDataContext _context;

        // Construtor que injeta o contexto do banco de dados.
        public MesasController(AppDataContext context){
            _context = context;
        }

        // Endpoint para obter todas as mesas.
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Mesa>>> Get(){

            // Retorna a lista de mesas do banco de dados.
            return await _context.Mesas.ToListAsync();
        }

        // Endpoint para liberar uma mesa, mudar de para 'não ocupada'.
        [HttpPut("{id}/liberar")]
        public async Task<IActionResult> LiberarMesa(int id){

            var mesa = await _context.Mesas.FindAsync(id);
            if (mesa == null)
                return NotFound(new { message = "Mesa não encontrada." }); 

            mesa.Ocupada = false; // Marca a mesa como não ocupada. 
            await _context.SaveChangesAsync(); // Salva a mudança no banco.

            return Ok(new { message = "Mesa liberada com sucesso!" }); 
        }

        // Endpoint para cadastrar uma nova mesa.
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Mesa mesa){

            _context.Mesas.Add(mesa); // Adiciona uma nova mesa no banco.
            await _context.SaveChangesAsync(); // Salva a nova mesa no banco.
            return Ok(new { message = "Mesa cadastrada com sucesso!", mesa });
        }

        // Endpoint para remover uma mesa.
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id){
            
            // Busca a mesa pelo Id.
            var mesa = await _context.Mesas.FindAsync(id);
            if (mesa == null)
                return NotFound(new { message = "Mesa não encontrada." });

            _context.Mesas.Remove(mesa); // Remove a mesa do banco.
            await _context.SaveChangesAsync(); // Salva a remoção no banco.

            return Ok(new { message = "Mesa removida com sucesso!" });
        }
    }
}
