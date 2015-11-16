using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Calendar.Models
{
	public class CalendarContext : DbContext
	{
		public DbSet<User> Users { get; set; }
		public DbSet<Profile> Profiles { get; set; }
		public DbSet<Record> Records { get; set; }

		public CalendarContext():
			base ("CalendarData")
		{

		}
	}
}