using BnBYachts.Booking.Booking;
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
        public DbSet<BoatelBooking> BoatelBookings { get; set; }
        public DbSet<CharterBooking> CharterBookings { get; set; }
        public DbSet<EventBooking> EventBookings { get; set; }
        public DbSet<Review> Reviews { get; set; }
        public DbSet<BookingCancelled> BookingCancelleds { get; set; }
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
