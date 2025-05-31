# Description
The purpose of this application is to create a simple way to create and a play a scavenger hunt.

## Technologies

### Backend
- <span>.NET</span> 8
- <span>ASP.NET</span> Web Api
- EF Core

### Frontend
- React 19
- Mantine
- React Router

## Backend

### User Secrets (Development)
1. `dotnet user-secrets set <Key> "<value>"`
2. `dotnet user-secrets list`
3. Using secret in program is already setup, just have to use the `IConfiguration` object with the key you specified in step 1

### Migrations
1. `dotnet ef migrations add <unique title> -o .\Persistance\Migrations`
2. `dotnet ef database update`
3. _Optional:_ `dotnet ef migrations script`
4. _Optional:_ `dotnet ef migrations remove`

## Frontend

### Debug
1. `npm i`
2. `npm start`