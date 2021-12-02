#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

# FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
# WORKDIR /app
# EXPOSE 80
# EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
# COPY ["nuget.config", "."]
COPY ["microservices/BnBYachts.Boat.HttpApi.Host/BnBYachts.Boat.HttpApi.Host.csproj", "microservices/BnBYachts.Boat.HttpApi.Host/"]
COPY ["modules/boat/src/BnBYachts.Boat.EntityFrameworkCore/BnBYachts.Boat.EntityFrameworkCore.csproj", "modules/boat/src/BnBYachts.Boat.EntityFrameworkCore/"]
COPY ["modules/boat/src/BnBYachts.Boat.Domain/BnBYachts.Boat.Domain.csproj", "modules/boat/src/BnBYachts.Boat.Domain/"]
COPY ["modules/boat/src/BnBYachts.Boat.Domain.Shared/BnBYachts.Boat.Domain.Shared.csproj", "modules/boat/src/BnBYachts.Boat.Domain.Shared/"]
COPY ["modules/boat/src/BnBYachts.Boat.HttpApi/BnBYachts.Boat.HttpApi.csproj", "modules/boat/src/BnBYachts.Boat.HttpApi/"]
COPY ["modules/boat/src/BnBYachts.Boat.Application.Contracts/BnBYachts.Boat.Application.Contracts.csproj", "modules/boat/src/BnBYachts.Boat.Application.Contracts/"]
COPY ["modules/EventBus/BnBYachts.EventBusShared/BnBYachts.EventBusShared.csproj", "modules/EventBus/BnBYachts.EventBusShared/"]
COPY ["modules/boat/src/BnBYachts.Boat.Application/BnBYachts.Boat.Application.csproj", "modules/boat/src/BnBYachts.Boat.Application/"]
RUN dotnet restore "microservices/BnBYachts.Boat.HttpApi.Host/BnBYachts.Boat.HttpApi.Host.csproj"
COPY . .
WORKDIR "/src/microservices/BnBYachts.Boat.HttpApi.Host"
RUN dotnet build "BnBYachts.Boat.HttpApi.Host.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "BnBYachts.Boat.HttpApi.Host.csproj" -c Release -o /app/publish
FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
COPY --from=publish /app/publish .
EXPOSE 80
ENTRYPOINT ["dotnet", "BnBYachts.Boat.HttpApi.Host.dll"]