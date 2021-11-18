#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

# FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
# WORKDIR /app
# EXPOSE 80
# EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
#COPY ["nuget.config", "."]
COPY ["microservices/BnBYachts.Booking.HttpApi.Host/BnBYachts.Booking.HttpApi.Host.csproj", "microservices/BnBYachts.Booking.HttpApi.Host/"]
COPY ["modules/booking/src/BnBYachts.Booking.EntityFrameworkCore/BnBYachts.Booking.EntityFrameworkCore.csproj", "modules/booking/src/BnBYachts.Booking.EntityFrameworkCore/"]
COPY ["modules/booking/src/BnBYachts.Booking.Domain/BnBYachts.Booking.Domain.csproj", "modules/booking/src/BnBYachts.Booking.Domain/"]
COPY ["modules/booking/src/BnBYachts.Booking.Domain.Shared/BnBYachts.Booking.Domain.Shared.csproj", "modules/booking/src/BnBYachts.Booking.Domain.Shared/"]
COPY ["modules/booking/src/BnBYachts.Booking.HttpApi/BnBYachts.Booking.HttpApi.csproj", "modules/booking/src/BnBYachts.Booking.HttpApi/"]
COPY ["modules/booking/src/BnBYachts.Booking.Application.Contracts/BnBYachts.Booking.Application.Contracts.csproj", "modules/booking/src/BnBYachts.Booking.Application.Contracts/"]
COPY ["modules/booking/src/BnBYachts.Booking.Application/BnBYachts.Booking.Application.csproj", "modules/booking/src/BnBYachts.Booking.Application/"]
RUN dotnet restore "microservices/BnBYachts.Booking.HttpApi.Host/BnBYachts.Booking.HttpApi.Host.csproj"
COPY . .
WORKDIR "/src/microservices/BnBYachts.Booking.HttpApi.Host"
RUN dotnet build "BnBYachts.Booking.HttpApi.Host.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "BnBYachts.Booking.HttpApi.Host.csproj" -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
COPY --from=publish /app/publish .
EXPOSE 80
ENTRYPOINT ["dotnet", "BnBYachts.Booking.HttpApi.Host.dll"]