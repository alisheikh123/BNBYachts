namespace BnBYachts.Shared.ElasticSearch
{

    public interface IChaseEntityDto : IChaseEntityDto<int>
    {
    }
    public interface IChaseEntityDto<TPrimaryKey>
    {
        /// <summary>Id of the entity.</summary>
        TPrimaryKey Id { get; set; }
    }
}