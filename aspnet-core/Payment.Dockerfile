#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

# FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
# WORKDIR /app
# EXPOSE 80
# EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
# COPY ["nuget.config", "."]
COPY ["microservices/BnBYachts.Payments.HttpApi.Host/BnBYachts.Payments.HttpApi.Host.csproj", "microservices/BnBYachts.Payments.HttpApi.Host/"]
COPY ["modules/payment/src/BnBYachts.Payments.Application/BnBYachts.Payments.Application.csproj", "modules/payment/src/BnBYachts.Payments.Application/"]
COPY ["modules/payment/src/BnBYachts.Payments.Application.Contracts/BnBYachts.Payments.Application.Contracts.csproj", "modules/payment/src/BnBYachts.Payments.Application.Contracts/"]
COPY ["modules/payment/src/BnBYachts.Payments.Domain.Shared/BnBYachts.Payments.Domain.Shared.csproj", "modules/payment/src/BnBYachts.Payments.Domain.Shared/"]
COPY ["modules/payment/src/BnBYachts.Payments.Domain/BnBYachts.Payments.Domain.csproj", "modules/payment/src/BnBYachts.Payments.Domain/"]
COPY ["modules/payment/src/BnBYachts.Payments.HttpApi/BnBYachts.Payments.HttpApi.csproj", "modules/payment/src/BnBYachts.Payments.HttpApi/"]
COPY ["modules/payment/src/BnBYachts.Payments.EntityFrameworkCore/BnBYachts.Payments.EntityFrameworkCore.csproj", "modules/payment/src/BnBYachts.Payments.EntityFrameworkCore/"]
RUN dotnet restore "microservices/BnBYachts.Payments.HttpApi.Host/BnBYachts.Payments.HttpApi.Host.csproj"
COPY . .
WORKDIR "/src/microservices/BnBYachts.Payments.HttpApi.Host"
RUN dotnet build "BnBYachts.Payments.HttpApi.Host.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "BnBYachts.Payments.HttpApi.Host.csproj" -c Release -o /app/publish
FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
COPY --from=publish /app/publish .
EXPOSE 80
ENTRYPOINT ["dotnet", "BnBYachts.Payments.HttpApi.Host.dll"]