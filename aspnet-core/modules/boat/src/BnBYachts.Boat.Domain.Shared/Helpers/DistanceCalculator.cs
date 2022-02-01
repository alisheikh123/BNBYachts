using System;

namespace BnBYachts.Boat.Helpers
{
    public class DistanceCalculator
    {
        ///helpers
        public static double GetDistanceInMeters(double sLat, double sLong, double dLat, double dLong)
        {
            var d1 = sLat * (Math.PI / 180.0);
            var num1 = sLong * (Math.PI / 180.0);
            var d2 = dLat * (Math.PI / 180.0);
            var num2 = dLong * (Math.PI / 180.0) - num1;
            var d3 = Math.Pow(Math.Sin((d2 - d1) / 2.0), 2.0) + Math.Cos(d1) * Math.Cos(d2) * Math.Pow(Math.Sin(num2 / 2.0), 2.0);

            var distanceInMM = 6376500.0 * (2.0 * Math.Atan2(Math.Sqrt(d3), Math.Sqrt(1.0 - d3)));
            var distanceinMeter = distanceInMM; //* 0.001;
            return distanceinMeter;
        }
    }
}
