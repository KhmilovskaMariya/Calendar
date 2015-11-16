using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Calendar.DTOs
{
	public class Record
	{
		public int Id { get; set; }
		public DateTime Date { get; set; }
		public string Text { get; set; }
		public int ProfileId { get; set; }

		public Record(Models.Record model)
		{
			Id = model.Id;
			Date = model.Date;
			Text = model.Text;
			ProfileId = model.ProfileId;
		}
	}
}