using BnBYachts.Boats.Charter;
using BnBYachts.Events;
using Microsoft.EntityFrameworkCore;
using Volo.Abp.Data;
using Volo.Abp.DependencyInjection;
using Volo.Abp.EntityFrameworkCore;
using Volo.Abp.Identity.EntityFrameworkCore;
using Volo.Abp.TenantManagement.EntityFrameworkCore;

namespace BnBYachts.Boat.EntityFrameworkCore
{
    //[ReplaceDbContext(typeof(IIdentityDbContext))]
    //[ReplaceDbContext(typeof(ITenantManagementDbContext))]
    [ConnectionStringName("Boat")]
    public class BoatDbContext : 
        AbpDbContext<BoatDbContext>
        //IIdentityDbContext,
        //ITenantManagementDbContext
    {
        /* Add DbSet properties for your Aggregate Roots / Entities here. */

        #region Entities from the modules

        /* Notice: We only implemented IIdentityDbContext and ITenantManagementDbContext
         * and replaced them for this DbContext. This allows you to perform JOIN
         * queries for the entities of these modules over the repositories easily. You
         * typically don't need that for other modules. But, if you need, you can
         * implement the DbContext interface of the needed module and use ReplaceDbContext
         * attribute just like IIdentityDbContext and ITenantManagementDbContext.
         *
         * More info: Replacing a DbContext of a module ensures that the related module
         * uses this DbContext on runtime. Otherwise, it will use its own DbContext class.
         */

        //public DbSet<Test.Test> TestApp{ get; set; }

        ////Identity
        //public DbSet<IdentityUser> Users { get; set; }
        //public DbSet<IdentityRole> Roles { get; set; }
        //public DbSet<IdentityClaimType> ClaimTypes { get; set; }
        //public DbSet<OrganizationUnit> OrganizationUnits { get; set; }
        //public DbSet<IdentitySecurityLog> SecurityLogs { get; set; }
        //public DbSet<IdentityLinkUser> LinkUsers { get; set; }
        
        //// Tenant Management
        //public DbSet<Tenant> Tenants { get; set; }
        //public DbSet<TenantConnectionString> TenantConnectionStrings { get; set; }
        // Yacht DbSets
        public DbSet<BoatEntity> Boats { get; set; }
        public DbSet<BoatGalleryEntity> BoatsGallery { get; set; }
        public DbSet<BoatCalendarEntity> BoatsCalendar { get; set; }
        public DbSet<BoatFeatureEntity> BoatsFeatures { get; set; }
        public DbSet<BoatLocationEntity> BoatsLocations { get; set; }
        public DbSet<BoatRuleEntity> BoatsRules { get; set; }
        public DbSet<FeatureEntity> Features { get; set; }
        public DbSet<RuleEntity> Rules { get; set; }

        // charter

        public DbSet<CharterEntity> Charteres { get; set; }

        //Event
        public DbSet<EventEntity> Events { get; set; }



        #endregion

        public BoatDbContext(DbContextOptions<BoatDbContext> options)
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
            //    b.ToTable(BoatConsts.DbTablePrefix + "YourEntities", BoatConsts.DbSchema);
            //    b.ConfigureByConvention(); //auto configure for the base class props
            //    //...
            //});
        }
    }
}
