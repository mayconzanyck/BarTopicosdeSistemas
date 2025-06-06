using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BarAPI.Models;


[Route("api/[controller]")]
[ApiController]
public class CardapioController : ControllerBase
{
    // Banco de dados, necessário para acessar as entidades.
    private readonly AppDataContext _context;

    // Construtor que injeta o contexto e chama a função de inicialização de dados.
    public CardapioController(AppDataContext context)
    {
        _context = context;
        SeedData(); // Inicializa os dados no banco, se necessário.
    }

    // Verifica se o banco de dados já contém dados no cardápio. Se não, adiciona uma lista inicial de bebidas.
    private void SeedData()
    {
        if (!_context.Cardapio.Any()) // Verifica se já exitem bebidas no cardápio.
        {
            var bebidas = new List<Bebida>
            {
                new Bebida { Nome = "Suco de Laranja", Preco = 5.00M, Alcoolica = false },
                new Bebida { Nome = "Refrigerante de Cola", Preco = 6.50M, Alcoolica = false },
                new Bebida { Nome = "Café Expresso", Preco = 4.00M, Alcoolica = false },
                new Bebida { Nome = "Caipirinha", Preco = 12.00M, Alcoolica = true },
                new Bebida { Nome = "Cerveja Pilsen", Preco = 8.00M, Alcoolica = true },
                new Bebida { Nome = "Cup of Jack", Preco = 25.00M, Alcoolica = true },
                new Bebida { Nome = "Cup of Gin", Preco = 20.00M, Alcoolica = true },
                new Bebida { Nome = "Choop 150ml", Preco = 10.00M, Alcoolica = true },
                new Bebida { Nome = "Choop de Vinho", Preco = 15.00M, Alcoolica = true },
                new Bebida { Nome = "Gin + Tonica", Preco = 30.00M, Alcoolica = true }
            };

            _context.Cardapio.AddRange(bebidas); // Adicionas as bebidas ao banco.
            _context.SaveChanges(); // Salva as bebidas no banco.
        }
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Bebida>>> Get()
    {
        return await _context.Cardapio.ToListAsync();
    }

    // Rota para obter as bebidas alcoólicas.
    [HttpGet("alcoolicas")]
    public async Task<ActionResult<IEnumerable<Bebida>>> GetAlcoolicas()
    {
        return await _context.Cardapio.Where(b => b.Alcoolica).ToListAsync(); // Filtra bebidas alcoólicas. 
    }

    // Rota para obter as bebidas não alcóolicas.
    [HttpGet("nao-alcoolicas")]
    public async Task<ActionResult<IEnumerable<Bebida>>> GetNaoAlcoolicas()
    {
        return await _context.Cardapio.Where(b => !b.Alcoolica).ToListAsync(); // Filtra bebidas não alcoólicas.
    }

    // Rota para adicionar uma bebida nova ao cardáapio.
    [HttpPost]
    public async Task<IActionResult> Post([FromBody] Bebida bebida)
    {
        _context.Cardapio.Add(bebida); // Adiciona nova bebida ao banco.
        await _context.SaveChangesAsync(); // Salva as mudanças no banco.
        return Ok(new { message = "Bebida adicionada ao cardápio!", bebida });
    }
}