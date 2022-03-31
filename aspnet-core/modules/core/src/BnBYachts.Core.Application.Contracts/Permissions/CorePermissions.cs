namespace BnBYachts.Core.Permissions
{
    public static class CorePermissions
    {
        public const string GroupName = "Core";

        //Add your own permission names. Example:
        public static class CoreNewsLetterPermissions
        {
            public const string Default = GroupName + ".NewsLetter";
            public const string View = Default + ".View";
            public const string Create = Default + ".Create";

        }
    }
}