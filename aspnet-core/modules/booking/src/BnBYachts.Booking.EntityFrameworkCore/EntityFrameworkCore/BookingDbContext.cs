using BnBYachts.Booking.Booking;
using BnBYachts.Booking.Contracts;
using BnBYachts.Booking.Disputes;
using Microsoft.EntityFrameworkCore;
using Volo.Abp.Data;
using Volo.Abp.EntityFrameworkCore;

namespace BnBYachts.Booking.EntityFrameworkCore
{
    //[ReplaceDbContext(typeof(IIdentityDbContext))]
    //[ReplaceDbContext(typeof(ITenantManagementDbContext))]
    [ConnectionStringName("Default")]
    public class BookingDbContext :
        AbpDbContext<BookingDbContext>
    // IIdentityDbContext,
    //ITenantManagementDbContext
    {
        /* Add DbSet properties for your Aggregate Roots / Entities here. */

        #region Entities from the modules
        public DbSet<BoatelBookingEntity> BoatelBookings { get; set; }
        public DbSet<CharterBookingEntity> CharterBookings { get; set; }
        public DbSet<EventBookingEntity> EventBookings { get; set; }
        public DbSet<BookingReviewEntity> Reviews { get; set; }
        public DbSet<BookingCancelEntity> BookingCancel { get; set; }
        public DbSet<BookingRefundableEntity> BookingRefundableEntity { get; set; }
        public DbSet<BookingDisputeEntity> BookingDisputes { get; set; }
        public DbSet<BookingEmailsTemplates> BookingEmailsTemplates { get; set; }
        public DbSet<ContractEntity> Contracts { get; set; }
        public DbSet<ContractTermsEntity> ContractsTerms { get; set; }

        #endregion

        public BookingDbContext(DbContextOptions<BookingDbContext> options)
            : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            /* Include modules to your migration db context */

            //builder.ConfigurePermissionManagement();
            //builder.ConfigureSettingManagement();
            //builder.ConfigureBackgroundJobs();
            //builder.ConfigureAuditLogging();
            //builder.ConfigureIdentity();
            //builder.ConfigureIdentityServer();
            //builder.ConfigureFeatureManagement();
            //builder.ConfigureTenantManagement();

            /* Configure your own tables/entities inside here */

            //builder.Entity<YourEntity>(b =>
            //{
            //    b.ToTable(BookingConsts.DbTablePrefix + "YourEntities", BookingConsts.DbSchema);
            //    b.ConfigureByConvention(); //auto configure for the base class props
            //    //...
            //});
        }
    }
}
