FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["microservices/BnBYachts.Socket.Web/BnBYachts.Socket.Web.csproj", "microservices/BnBYachts.Socket.Web/"]
COPY ["modules/notification/src/BnBYachts.Notification.MongoDB/BnBYachts.Notification.MongoDB.csproj", "modules/notification/src/BnBYachts.Notification.MongoDB/"]
COPY ["modules/notification/src/BnBYachts.Notification.Domain/BnBYachts.Notification.Domain.csproj", "modules/notification/src/BnBYachts.Notification.Domain/"]
COPY ["modules/notification/src/BnBYachts.Notification.Domain.Shared/BnBYachts.Notification.Domain.Shared.csproj", "modules/notification/src/BnBYachts.Notification.Domain.Shared/"]
COPY ["modules/notification/src/BnBYachts.Notification.HttpApi/BnBYachts.Notification.HttpApi.csproj", "modules/notification/src/BnBYachts.Notification.HttpApi/"]
COPY ["modules/notification/src/BnBYachts.Notification.Application.Contracts/BnBYachts.Notification.Application.Contracts.csproj", "modules/notification/src/BnBYachts.Notification.Application.Contracts/"]
COPY ["modules/notification/src/BnBYachts.Notification.Application/BnBYachts.Notification.Application.csproj", "modules/notification/src/BnBYachts.Notification.Application/"]
RUN dotnet restore "microservices/BnBYachts.Socket.Web/BnBYachts.Socket.Web.csproj"
COPY . .
WORKDIR "/src/microservices/BnBYachts.Socket.Web"
RUN dotnet build "BnBYachts.Socket.Web.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "BnBYachts.Socket.Web.csproj" -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
COPY --from=publish /app/publish .
EXPOSE 80
ENTRYPOINT ["dotnet", "BnBYachts.Socket.Web.dll"]