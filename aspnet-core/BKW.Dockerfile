#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/runtime:5.0 AS base
WORKDIR /app

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src

COPY ["modules/backgroundWorker/src/BnByachts.BackgroundWorker/BnByachts.BackgroundWorker.csproj", "modules/backgroundWorker/src/BnByachts.BackgroundWorker/"]
COPY ["modules/booking/src/BnBYachts.Booking.Domain.Shared/BnBYachts.Booking.Domain.Shared.csproj", "modules/booking/src/BnBYachts.Booking.Domain.Shared/"]
COPY ["shared/BnBYachts.Shared/BnBYachts.Shared.csproj", "shared/BnBYachts.Shared/"]
COPY ["modules/EventBus/BnBYachts.EventBusShared/BnBYachts.EventBusShared.csproj", "modules/EventBus/BnBYachts.EventBusShared/"]
RUN dotnet restore "modules/backgroundWorker/src/BnByachts.BackgroundWorker/BnByachts.BackgroundWorker.csproj"
COPY . .
WORKDIR "/src/modules/backgroundWorker/src/BnByachts.BackgroundWorker"
RUN dotnet build "BnByachts.BackgroundWorker.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "BnByachts.BackgroundWorker.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "BnByachts.BackgroundWorker.dll"]