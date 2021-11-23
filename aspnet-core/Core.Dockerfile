#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

# FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
# WORKDIR /app
# EXPOSE 80
# EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
# COPY ["nuget.config", "."]
COPY ["microservices/BnBYachts.Core.HttpApi.Host/BnBYachts.Core.HttpApi.Host.csproj", "microservices/BnBYachts.Core.HttpApi.Host/"]
COPY ["modules/core/src/BnBYachts.Core.Application/BnBYachts.Core.Application.csproj", "modules/core/src/BnBYachts.Core.Application/"]
COPY ["modules/core/src/BnBYachts.Core.Domain/BnBYachts.Core.Domain.csproj", "modules/core/src/BnBYachts.Core.Domain/"]
COPY ["modules/core/src/BnBYachts.Core.Domain.Shared/BnBYachts.Core.Domain.Shared.csproj", "modules/core/src/BnBYachts.Core.Domain.Shared/"]
COPY ["modules/core/src/BnBYachts.Core.Application.Contracts/BnBYachts.Core.Application.Contracts.csproj", "modules/core/src/BnBYachts.Core.Application.Contracts/"]
COPY ["modules/EventBus/BnBYachts.EventBusShared/BnBYachts.EventBusShared.csproj", "modules/EventBus/BnBYachts.EventBusShared/"]
COPY ["modules/core/src/BnBYachts.Core.EntityFrameworkCore/BnBYachts.Core.EntityFrameworkCore.csproj", "modules/core/src/BnBYachts.Core.EntityFrameworkCore/"]
COPY ["modules/core/src/BnBYachts.Core.HttpApi/BnBYachts.Core.HttpApi.csproj", "modules/core/src/BnBYachts.Core.HttpApi/"]
RUN dotnet restore "microservices/BnBYachts.Core.HttpApi.Host/BnBYachts.Core.HttpApi.Host.csproj"
COPY . .
WORKDIR "/src/microservices/BnBYachts.Core.HttpApi.Host"
RUN dotnet build "BnBYachts.Core.HttpApi.Host.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "BnBYachts.Core.HttpApi.Host.csproj" -c Release -o /app/publish
FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
COPY --from=publish /app/publish .
EXPOSE 80
ENTRYPOINT ["dotnet", "BnBYachts.Core.HttpApi.Host.dll"]