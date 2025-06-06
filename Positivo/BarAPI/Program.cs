using BarAPI.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Configuração do banco de Dados SQLite
builder.Services.AddDbContext<AppDataContext>(options =>
    options.UseSqlite("Data Source=bar.db"));

// Configurações de Controllers
builder.Services.AddControllers();

// Configuração do Swagger com título, versão e descrição
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
    {
        Title = "BarAPI",
        Version = "v1",
        Description = "API para o gerenciamento de mesas no bar",
    });
});

// Adicionando compressão de resposta
builder.Services.AddResponseCompression();

// Configuração de CORS (Caso necessário, pode ser ajustado)
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.AllowAnyOrigin()  // Permite requisições de qualquer origem
               .AllowAnyMethod()  // Permite qualquer método HTTP
               .AllowAnyHeader(); // Permite qualquer cabeçalho
    });
});

var app = builder.Build();

// Habilitando o Swagger apenas no ambiente de desenvolvimento
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();  // Gera a documentação Swagger
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/swagger/v1/swagger.json", "BarAPI v1"); // Configura a interface Swagger UI
    });
}

// Habilita compressão de resposta
app.UseResponseCompression();

// Habilita CORS
app.UseCors();

// Configuração de redirecionamento de HTTPS e autorização
app.UseHttpsRedirection();
app.UseAuthorization();

// Mapeia as rotas para os controllers da API
app.MapControllers();

app.Run();
