using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BarAPI.Models;

[Route("api/[controller]")]
[ApiController]
public class ClienteController : ControllerBase
{
    // Banco de dados, necessário para acessar as entidades.
    private readonly AppDataContext _context;

    // Construtor que injeta contexto no controlador.
    public ClienteController(AppDataContext context)
    {
        _context = context;
    }


    // Rota para obter os clientes cadastrados.
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Cliente>>> Get()
    {
        return await _context.Clientes.ToListAsync(); // Retorna todos os clientes.
    }

    // Rota para cadastrar novo cliente.
    [HttpPost]
    public async Task<IActionResult> Post([FromBody] Cliente cliente)
    {
        // Verifica se o cliente é menor de idade.
        if (cliente.Idade < 18)
        {
            return BadRequest(new { message = "Cliente menor de idade! Cadastro permitido, mas o acesso a bebidas alcoólicas será restrito." });
        }

        _context.Clientes.Add(cliente); // Adiciona cliente ao banco.
        await _context.SaveChangesAsync(); // Salva as mudanças no banco.
        return Ok(new { message = "Cliente cadastrado com sucesso!", cliente });
    }
    
    // Atualizar Cliente
    [HttpPut("{id}")]
    public async Task<IActionResult> Put(int id, [FromBody] Cliente clienteAtualizado)
    {
        if (id != clienteAtualizado.Id)
        {
            return BadRequest(new { message = "ID da URL não confere com o ID do cliente." });
        }

        var clienteExistente = await _context.Clientes.FindAsync(id);

        if (clienteExistente == null)
        {
            return NotFound(new { message = "Cliente não encontrado." });
        }

        // Atualiza os campos do cliente existente
        clienteExistente.Nome = clienteAtualizado.Nome;
        clienteExistente.DataNascimento = clienteAtualizado.DataNascimento;

        // Salva as alterações
        await _context.SaveChangesAsync();

        return Ok(new { message = "Cliente atualizado com sucesso!", cliente = clienteExistente });
    }


    
        // Excluir Cliente
    [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var cliente = await _context.Clientes.FindAsync(id); // Procura o cliente pelo ID

            if (cliente == null)
            {
                return NotFound(new { message = "Cliente não encontrado." }); // Retorna erro se não achar
            }

            _context.Clientes.Remove(cliente); // Remove do banco
            await _context.SaveChangesAsync(); // Salva as mudanças

            return Ok(new { message = "Cliente removido com sucesso!", cliente });
        }

}
