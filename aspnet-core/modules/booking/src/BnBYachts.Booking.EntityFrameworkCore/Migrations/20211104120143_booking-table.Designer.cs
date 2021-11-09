﻿// <auto-generated />
using System;
using BnBYachts.Booking.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Volo.Abp.EntityFrameworkCore;

namespace BnBYachts.Booking.Migrations
{
    [DbContext(typeof(BookingDbContext))]
    [Migration("20211104120143_booking-table")]
    partial class bookingtable
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("_Abp_DatabaseProvider", EfCoreDatabaseProvider.SqlServer)
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.11")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("BnBYachts.Booking.BoatelBooking", b =>
                {
                    b.Property<Guid>("Id")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("BankingDetailsId")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("BoatId")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("BookingStatus")
                        .HasColumnType("int");

                    b.Property<DateTime>("CheckinDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("CheckoutDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasMaxLength(40)
                        .HasColumnType("nvarchar(40)")
                        .HasColumnName("ConcurrencyStamp");

                    b.Property<DateTime>("CreationTime")
                        .HasColumnType("datetime2")
                        .HasColumnName("CreationTime");

                    b.Property<Guid?>("CreatorId")
                        .HasColumnType("uniqueidentifier")
                        .HasColumnName("CreatorId");

                    b.Property<string>("ExtraProperties")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("ExtraProperties");

                    b.Property<DateTime?>("LastModificationTime")
                        .HasColumnType("datetime2")
                        .HasColumnName("LastModificationTime");

                    b.Property<Guid?>("LastModifierId")
                        .HasColumnType("uniqueidentifier")
                        .HasColumnName("LastModifierId");

                    b.Property<int>("PaymentStatus")
                        .HasColumnType("int");

                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("BoatelBookings");
                });

            modelBuilder.Entity("BnBYachts.Booking.Booking.EventBooking", b =>
                {
                    b.Property<Guid>("Id")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("BankingDetailsId")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasMaxLength(40)
                        .HasColumnType("nvarchar(40)")
                        .HasColumnName("ConcurrencyStamp");

                    b.Property<DateTime>("CreationTime")
                        .HasColumnType("datetime2")
                        .HasColumnName("CreationTime");

                    b.Property<Guid?>("CreatorId")
                        .HasColumnType("uniqueidentifier")
                        .HasColumnName("CreatorId");

                    b.Property<DateTime>("EventDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("EventId")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ExtraProperties")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("ExtraProperties");

                    b.Property<DateTime?>("LastModificationTime")
                        .HasColumnType("datetime2")
                        .HasColumnName("LastModificationTime");

                    b.Property<Guid?>("LastModifierId")
                        .HasColumnType("uniqueidentifier")
                        .HasColumnName("LastModifierId");

                    b.Property<int>("NoOfGuests")
                        .HasColumnType("int");

                    b.Property<int>("PaymentStatus")
                        .HasColumnType("int");

                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("EventBookings");
                });

            modelBuilder.Entity("BnBYachts.Booking.CharterBooking", b =>
                {
                    b.Property<Guid>("Id")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("BankingDetailsId")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("CharterId")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasMaxLength(40)
                        .HasColumnType("nvarchar(40)")
                        .HasColumnName("ConcurrencyStamp");

                    b.Property<DateTime>("CreationTime")
                        .HasColumnType("datetime2")
                        .HasColumnName("CreationTime");

                    b.Property<Guid?>("CreatorId")
                        .HasColumnType("uniqueidentifier")
                        .HasColumnName("CreatorId");

                    b.Property<DateTime>("DepartureDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("ExtraProperties")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("ExtraProperties");

                    b.Property<DateTime?>("LastModificationTime")
                        .HasColumnType("datetime2")
                        .HasColumnName("LastModificationTime");

                    b.Property<Guid?>("LastModifierId")
                        .HasColumnType("uniqueidentifier")
                        .HasColumnName("LastModifierId");

                    b.Property<int>("NoOfAdults")
                        .HasColumnType("int");

                    b.Property<int>("NoOfChildrens")
                        .HasColumnType("int");

                    b.Property<int>("PaymentStatus")
                        .HasColumnType("int");

                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("CharterBookings");
                });

            modelBuilder.Entity("BnBYachts.Booking.Review", b =>
                {
                    b.Property<Guid>("Id")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("BoatelBookingId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("CharterBookingId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasMaxLength(40)
                        .HasColumnType("nvarchar(40)")
                        .HasColumnName("ConcurrencyStamp");

                    b.Property<DateTime>("CreationTime")
                        .HasColumnType("datetime2")
                        .HasColumnName("CreationTime");

                    b.Property<Guid?>("CreatorId")
                        .HasColumnType("uniqueidentifier")
                        .HasColumnName("CreatorId");

                    b.Property<Guid?>("EventBookingId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("ExtraProperties")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("ExtraProperties");

                    b.Property<DateTime?>("LastModificationTime")
                        .HasColumnType("datetime2")
                        .HasColumnName("LastModificationTime");

                    b.Property<Guid?>("LastModifierId")
                        .HasColumnType("uniqueidentifier")
                        .HasColumnName("LastModifierId");

                    b.Property<int>("Ratings")
                        .HasColumnType("int");

                    b.Property<string>("ReviewDescription")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("RevieweeID")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ReviewerId")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("BoatelBookingId");

                    b.HasIndex("CharterBookingId");

                    b.HasIndex("EventBookingId");

                    b.ToTable("Reviews");
                });

            modelBuilder.Entity("BnBYachts.Booking.Review", b =>
                {
                    b.HasOne("BnBYachts.Booking.BoatelBooking", null)
                        .WithMany("Reviews")
                        .HasForeignKey("BoatelBookingId");

                    b.HasOne("BnBYachts.Booking.CharterBooking", null)
                        .WithMany("Reviews")
                        .HasForeignKey("CharterBookingId");

                    b.HasOne("BnBYachts.Booking.Booking.EventBooking", null)
                        .WithMany("Reviews")
                        .HasForeignKey("EventBookingId");
                });

            modelBuilder.Entity("BnBYachts.Booking.BoatelBooking", b =>
                {
                    b.Navigation("Reviews");
                });

            modelBuilder.Entity("BnBYachts.Booking.Booking.EventBooking", b =>
                {
                    b.Navigation("Reviews");
                });

            modelBuilder.Entity("BnBYachts.Booking.CharterBooking", b =>
                {
                    b.Navigation("Reviews");
                });
#pragma warning restore 612, 618
        }
    }
}
