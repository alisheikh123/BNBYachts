#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
# COPY ["nuget.config", "."]
COPY ["applications/BnBYachts.IdentityServer/BnBYachts.IdentityServer.csproj", "applications/BnBYachts.IdentityServer/"]
COPY ["modules/core/src/BnBYachts.Core.Domain.Shared/BnBYachts.Core.Domain.Shared.csproj", "modules/core/src/BnBYachts.Core.Domain.Shared/"]
COPY ["modules/core/src/BnBYachts.Core.EntityFrameworkCore/BnBYachts.Core.EntityFrameworkCore.csproj", "modules/core/src/BnBYachts.Core.EntityFrameworkCore/"]
COPY ["modules/core/src/BnBYachts.Core.Domain/BnBYachts.Core.Domain.csproj", "modules/core/src/BnBYachts.Core.Domain/"]
RUN dotnet restore "applications/BnBYachts.IdentityServer/BnBYachts.IdentityServer.csproj"
COPY . .
WORKDIR "/src/applications/BnBYachts.IdentityServer"
RUN dotnet build "BnBYachts.IdentityServer.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "BnBYachts.IdentityServer.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "BnBYachts.IdentityServer.dll"]