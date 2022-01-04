FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY ["microservices/BnBYachts.Chat.HttpApi.Host/BnBYachts.Chat.HttpApi.Host.csproj", "microservices/BnBYachts.Chat.HttpApi.Host/"]
COPY ["modules/chat/src/BnBYachts.Chat.Application/BnBYachts.Chat.Application.csproj", "modules/chat/src/BnBYachts.Chat.Application/"]
COPY ["modules/chat/src/BnBYachts.Chat.Domain/BnBYachts.Chat.Domain.csproj", "modules/chat/src/BnBYachts.Chat.Domain/"]
COPY ["shared/BnBYachts.Shared/BnBYachts.Shared.csproj", "shared/BnBYachts.Shared/"]
COPY ["modules/chat/src/BnBYachts.Chat.MongoDB/BnBYachts.Chat.MongoDB.csproj", "modules/chat/src/BnBYachts.Chat.MongoDB/"]
COPY ["modules/chat/src/BnBYachts.Chat.EntityFrameworkCore/BnBYachts.Chat.EntityFrameworkCore.csproj", "modules/chat/src/BnBYachts.Chat.EntityFrameworkCore/"]
COPY ["modules/chat/src/BnBYachts.Chat.HttpApi/BnBYachts.Chat.HttpApi.csproj", "modules/chat/src/BnBYachts.Chat.HttpApi/"]
RUN dotnet restore "microservices/BnBYachts.Chat.HttpApi.Host/BnBYachts.Chat.HttpApi.Host.csproj"
COPY . .
WORKDIR "/src/microservices/BnBYachts.Chat.HttpApi.Host"
RUN dotnet build "BnBYachts.Chat.HttpApi.Host.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "BnBYachts.Chat.HttpApi.Host.csproj" -c Release -o /app/publish
FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
COPY --from=publish /app/publish .
EXPOSE 80
ENTRYPOINT ["dotnet", "BnBYachts.Chat.HttpApi.Host.dll"]