using Microsoft.EntityFrameworkCore;
using ScavengerHunt.WebApi.Persistance;
using ScavengerHunt.WebApi.Utils;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<HuntDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("HuntDbContext")));
builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<ImageSimilarityHelper>();
builder.Services.AddScoped<ImageAnalysisHelper>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.MapControllers();
app.MapFallbackToFile("index.html");

app.Run();