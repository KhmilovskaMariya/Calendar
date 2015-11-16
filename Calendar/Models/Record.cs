using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Calendar.Models
{
	public class Record
	{
		public int Id { get; set; }
		public DateTime Date { get; set; }
		public string Text { get; set; }
		public int ProfileId { get; set; }

		public virtual Profile Profile { get; set; }
	}
}