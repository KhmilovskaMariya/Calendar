namespace Calendar.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;
	using Calendar.Models;
	using System.Web.Helpers;

    internal sealed class Configuration : DbMigrationsConfiguration<Calendar.Models.CalendarContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
            ContextKey = "Calendar.Models.CalendarContext";
        }

        protected override void Seed(Calendar.Models.CalendarContext context)
        {
			context.Users.AddOrUpdate(
				new User()
				{
					Id = 1,
					FirstName = "John",
					LastName = "Doe",
					PhoneNumber = "0961234567",
					Password = Crypto.HashPassword("password")
				},
				new User()
				{
					Id = 2,
					FirstName = "Jane",
					LastName = "Smith",
					PhoneNumber = "0937654321",
					Password = Crypto.HashPassword("123")
				}
			);
			context.Profiles.AddOrUpdate(
				new Profile()
				{
					Id = 1,
					Title = "Main",
					UserId = 1
				},
				new Profile()
				{
					Id = 2,
					Title = "Holidays",
					UserId = 1
				},
				new Profile()
				{
					Id = 3,
					Title = "Default",
					UserId = 2
				}
			);
			context.Records.AddOrUpdate(
				new Record()
				{
					Id = 1,
					Date = new DateTime(2015, 12, 12),
					Text = "Calendar deadline",
					ProfileId = 1
				},
				new Record()
				{
					Id = 2,
					Date = new DateTime(2015, 11, 13),
					Text = "Team created",
					ProfileId = 1
				},
				new Record()
				{
					Id = 3,
					Date = new DateTime(2015, 11, 17),
					Text = "Computer graphics colloquium",
					ProfileId = 1
				},
				new Record()
				{
					Id = 4,
					Date = new DateTime(2015, 11, 21),
					Text = "Visit park",
					ProfileId = 2
				},
				new Record()
				{
					Id = 5,
					Date = new DateTime(2015, 11, 10),
					Text = "Past date",
					ProfileId = 3
				},
				new Record()
				{
					Id = 6,
					Date = new DateTime(2015, 11, 20),
					Text = "Future date",
					ProfileId = 3
				}
			);
			context.SaveChanges();
        }
    }
}
