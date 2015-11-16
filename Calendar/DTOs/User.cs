using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Calendar.DTOs
{
	public class User
	{
		public int Id { get; set; }
		public string FirstName { get; set; }
		public string LastName { get; set; }
		public string PhoneNumber { get; set; }

		public User(Models.User model)
		{
			Id = model.Id;
			FirstName = model.FirstName;
			LastName = model.LastName;
			PhoneNumber = model.PhoneNumber;
		}
	}
}