
FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
#COPY ["nuget.config", "."]
COPY ["modules/notificationHub/BnByachts.NotificationHub/BnByachts.NotificationHub.csproj", "modules/notificationHub/BnByachts.NotificationHub/"]
COPY ["modules/EventBus/BnBYachts.EventBusShared/BnBYachts.EventBusShared.csproj", "modules/EventBus/BnBYachts.EventBusShared/"]
RUN dotnet restore "modules/notificationHub/BnByachts.NotificationHub/BnByachts.NotificationHub.csproj"
COPY . .
WORKDIR "/src/modules/notificationHub/BnByachts.NotificationHub"
RUN dotnet build "BnByachts.NotificationHub.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "BnByachts.NotificationHub.csproj" -c Release -o /app/publish


FROM mcr.microsoft.com/dotnet/aspnet:5.0-buster-slim AS base
WORKDIR /app
COPY --from=publish /app/publish .

ENTRYPOINT ["dotnet", "BnByachts.NotificationHub.dll"]