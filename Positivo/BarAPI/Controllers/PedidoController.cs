using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BarAPI.Models;

[Route("api/[controller]")]
[ApiController]
public class PedidoController : ControllerBase{
    // Banco de dados, necessário para acessar as entidades.
    private readonly AppDataContext _context;

    // Construtor que injeta o contexto no controlador.
    public PedidoController(AppDataContext context){
        _context = context;
    }

    // Retorna todos os pedidos, incluindo as informações sobre o cliente e a bebida.
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Pedido>>> Get(){

        return await _context.Pedidos
            .Include(p => p.Cliente) // Inclui o cliente no pedido.
            .Include(p => p.Bebida) // Inclui a bebida no pedido.
            .ToListAsync(); // Retorna a lista de pedidos.
    }

    // Realiza um novo pedido.
    [HttpPost]
    public async Task<IActionResult> Post([FromBody] Pedido pedido){

        // Verifica se existe o cliente e a bebida no banco.
        var cliente = await _context.Clientes.FindAsync(pedido.ClienteId); 
        var bebida = await _context.Cardapio.FindAsync(pedido.BebidaId);

        // Retorna erro se cliente ao bebida não existirem no banco.
        if (cliente == null || bebida == null){

            return NotFound(new { message = "Cliente ou Bebida não encontrado." });
        }

        // Verifica se o cliente não é menor de idade.
        if (bebida.Alcoolica && cliente.Idade < 18){
            
            return BadRequest(new { message = "Cliente menor de idade não pode pedir bebida alcoólica." });
        }

        _context.Pedidos.Add(pedido); // Adiciona pedido ao banco.
        await _context.SaveChangesAsync(); // Salva pedido no banco.

        return Ok(new { message = "Pedido realizado com sucesso!", pedido });
    }
}
