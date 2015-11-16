using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Calendar.Models
{
	public class Profile
	{
		public int Id { get; set; }
		public string Title { get; set; }
		public int UserId { get; set; }

		public virtual User User { get; set; }
		public virtual ICollection<Record> Records { get; set; }
	}
}