using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using Calendar.Models;
using System.Web.Helpers;

namespace Calendar.Controllers
{
    public class UserController : ApiController
    {
        private CalendarContext db = new CalendarContext();

        // GET api/User
        public IEnumerable<DTOs.User> GetUsers()
        {
			return db.Users.ToArray().Select(user => new DTOs.User(user));
        }

        // GET api/User/5
        [ResponseType(typeof(DTOs.User))]
        public IHttpActionResult GetUser(int id)
        {
            User user = db.Users.Find(id);
            if (user == null)
            {
                return NotFound();
            }

            return Ok(new DTOs.User(user));
        }

		// GET api/User/Find/0961234567
		[Route("api/User/Find/{phone}")]
		[ResponseType(typeof(DTOs.User))]
		public IHttpActionResult GetUser(string phone)
		{
			User user = db.Users.Where(u => u.PhoneNumber == phone).SingleOrDefault();
			if (user == null)
			{
				return NotFound();
			}

			return Ok(new DTOs.User(user));
		}

		// GET api/User/Current
		[Authorize]
		[Route("api/User/Current")]
		[ResponseType(typeof(DTOs.User))]
		public IHttpActionResult GetUser()
		{
			return GetUser(int.Parse(User.Identity.Name));
		}

		// GET api/User/1/Profiles
		[Authorize(Roles = "admin")]
		[Route("api/User/{id:int}/Profiles")]
		[ResponseType(typeof(IEnumerable<DTOs.Profile>))]
		public IHttpActionResult GetProfiles(int id)
		{
			User user = db.Users.Find(id);
			if (user == null)
			{
				return NotFound();
			}

			return Ok(user.Profiles
				.ToArray().Select(profile => new DTOs.Profile(profile)));
		}

		// GET api/User/Current/Profiles
		[Authorize]
		[Route("api/User/Current/Profiles")]
		[ResponseType(typeof(IEnumerable<DTOs.Profile>))]
		public IHttpActionResult GetProfiles()
		{
			return GetProfiles(int.Parse(User.Identity.Name));
		}

        // PUT api/User/5
		[Authorize(Roles = "admin")]
        public IHttpActionResult PutUser(int id, User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != user.Id)
            {
                return BadRequest();
            }

			if (user.Password == null || user.Password == "")
			{
				var oldUser = db.Users.Find(id);
				if (oldUser == null)
				{
					return NotFound();
				}
				user.Password = oldUser.Password;
			}

            db.Entry(user).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

		// PUT api/User/Current
		[Authorize]
		[Route("api/User/Current")]
		public IHttpActionResult PutUser(User user)
		{
			return PutUser(int.Parse(User.Identity.Name), user);
		}

        // POST api/User
        [ResponseType(typeof(DTOs.User))]
        public IHttpActionResult PostUser(User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

			user.Password = Crypto.HashPassword(user.Password);

            db.Users.Add(user);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = user.Id }, new DTOs.User(user));
        }

        // DELETE api/User/5
		[Authorize(Roles = "admin")]
        [ResponseType(typeof(DTOs.User))]
        public IHttpActionResult DeleteUser(int id)
        {
            User user = db.Users.Find(id);
            if (user == null)
            {
                return NotFound();
            }

            db.Users.Remove(user);
            db.SaveChanges();

            return Ok(new DTOs.User(user));
        }

		// DELETE api/User/Current
		[Authorize]
		[Route("api/User/Current")]
		[ResponseType(typeof(DTOs.User))]
		public IHttpActionResult DeleteUser()
		{
			return DeleteUser(int.Parse(User.Identity.Name));
		}

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool UserExists(int id)
        {
            return db.Users.Count(e => e.Id == id) > 0;
        }
    }
}