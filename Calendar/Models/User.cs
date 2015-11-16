﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Calendar.Models
{
	public class User
	{
		public int Id { get; set; }
		public string FirstName { get; set; }
		public string LastName { get; set; }
		public string PhoneNumber { get; set; }
		public string Password { get; set; }

		public virtual ICollection<Profile> Profiles { get; set; }
	}
}