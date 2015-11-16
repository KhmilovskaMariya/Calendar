using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Calendar.DTOs
{
	public class Profile
	{
		public int Id { get; set; }
		public string Title { get; set; }
		public int UserId { get; set; }

		public Profile(Models.Profile model)
		{
			Id = model.Id;
			Title = model.Title;
			UserId = model.UserId;
		}
	}
}