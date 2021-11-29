#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/runtime:5.0 AS base
WORKDIR /app

#FROM mcr.microsoft.com/dotnet/sdk:5.0
FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
# COPY ["nuget.config", "."]
COPY ["modules/notificationHub/BnByachts.NotificationHub/BnByachts.NotificationHub.csproj", "modules/notificationHub/BnByachts.NotificationHub/"]
COPY ["modules/EventBus/BnBYachts.EventBusShared/BnBYachts.EventBusShared.csproj", "modules/EventBus/BnBYachts.EventBusShared/"]
RUN dotnet restore "modules/notificationHub/BnByachts.NotificationHub/BnByachts.NotificationHub.csproj"
COPY . .
WORKDIR "/src/modules/notificationHub/BnByachts.NotificationHub"
RUN dotnet build "BnByachts.NotificationHub.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "BnByachts.NotificationHub.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
#BnByachts.NotificationHub.dll
 ENTRYPOINT ["dotnet", "BnByachts.NotificationHub.dll"]