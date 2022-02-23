FROM mcr.microsoft.com/dotnet/runtime:5.0 AS base
WORKDIR /app

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY ["buildingblocks/elasticSearch/src/BnBYachts.ElasticSearch.Bkworker/BnBYachts.ElasticSearch.Bkworker.csproj", "buildingblocks/elasticSearch/src/BnBYachts.ElasticSearch.Bkworker/"]
COPY ["modules/EventBus/BnBYachts.EventBusShared/BnBYachts.EventBusShared.csproj", "modules/EventBus/BnBYachts.EventBusShared/"]
COPY ["buildingblocks/elasticSearch/src/BnBYachts.ElasticSearch/BnBYachts.ElasticSearch.csproj", "buildingblocks/elasticSearch/src/BnBYachts.ElasticSearch/"]
RUN dotnet restore "buildingblocks/elasticSearch/src/BnBYachts.ElasticSearch.Bkworker/BnBYachts.ElasticSearch.Bkworker.csproj"
COPY . .
WORKDIR "/src/buildingblocks/elasticSearch/src/BnBYachts.ElasticSearch.Bkworker"
RUN dotnet build "BnBYachts.ElasticSearch.Bkworker.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "BnBYachts.ElasticSearch.Bkworker.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "BnBYachts.ElasticSearch.Bkworker.dll"]