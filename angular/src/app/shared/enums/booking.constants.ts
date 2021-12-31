export enum ServiceType {
    Boatels = "Boatels",
    Charters = "ChartersEvents"
  }

  export enum BookingStatus {
    Pending = 0,
    Approved = 1,
    Rejected = 2,
    Cancel = 3,
    ChooseFilter = 4
  }
  export enum BookingResponseFilter
  {
      All=0,
      Upcomings= 1,
      Past = 2,
      ChooseFilter=3
  }