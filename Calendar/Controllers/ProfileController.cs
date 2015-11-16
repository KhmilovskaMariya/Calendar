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

namespace Calendar.Controllers
{
    public class ProfileController : ApiController
    {
        private CalendarContext db = new CalendarContext();

        // GET api/Profile
		[Authorize(Roles = "admin")]
        public IEnumerable<DTOs.Profile> GetProfiles()
        {
            return db.Profiles.ToArray().Select(profile => new DTOs.Profile(profile));
        }

        // GET api/Profile/5
		[Authorize]
        [ResponseType(typeof(DTOs.Profile))]
        public IHttpActionResult GetProfile(int id)
        {
            Profile profile = db.Profiles.Find(id);
            if (profile == null)
            {
                return NotFound();
            }

            return Ok(new DTOs.Profile(profile));
        }

		// GET api/Profile/5/Records
		[Authorize]
		[Route("api/Profile/{id}/Records")]
		[ResponseType(typeof(IEnumerable<DTOs.Record>))]
		public IHttpActionResult GetRecords(int id)
		{
			Profile profile = db.Profiles.Find(id);
			if (profile == null)
			{
				return NotFound();
			}

			return Ok(profile.Records
				.ToArray().Select(record => new DTOs.Record(record)));
		}

		// GET api/Profile/5/Records/2015
		[Authorize]
		[Route("api/Profile/{id}/Records/{year}")]
		[ResponseType(typeof(IEnumerable<DTOs.Record>))]
		public IHttpActionResult GetRecordsByYear(int id, int year)
		{
			Profile profile = db.Profiles.Find(id);
			if (profile == null)
			{
				return NotFound();
			}

			return Ok(profile.Records
				.Where(r => r.Date.Year == year)
				.ToArray().Select(record => new DTOs.Record(record)));
		}

		// GET api/Profile/5/Records/2015/11
		[Authorize]
		[Route("api/Profile/{id}/Records/{year}/{month}")]
		[ResponseType(typeof(IEnumerable<DTOs.Record>))]
		public IHttpActionResult GetRecordsByMonth(int id, int year, int month)
		{
			Profile profile = db.Profiles.Find(id);
			if (profile == null)
			{
				return NotFound();
			}
			if (month < 1 || month > 12)
			{
				return BadRequest();
			}

			return Ok(profile.Records
				.Where(r => r.Date.Year == year && r.Date.Month == month)
				.ToArray().Select(record => new DTOs.Record(record)));
		}

		// GET api/Profile/5/Records/2015/11/3
		[Authorize]
		[Route("api/Profile/{id}/Records/{year}/{month}/{day}")]
		[ResponseType(typeof(IEnumerable<DTOs.Record>))]
		public IHttpActionResult GetRecordsByDay(int id, int year, int month, int day)
		{
			Profile profile = db.Profiles.Find(id);
			if (profile == null)
			{
				return NotFound();
			}
			if (month < 1 || month > 12 || day < 1 || day > 31)
			{
				return BadRequest();
			}

			return Ok(profile.Records
				.Where(r => r.Date.Year == year && r.Date.Month == month && r.Date.Day == day)
				.ToArray().Select(record => new DTOs.Record(record)));
		}

        // PUT api/Profile/5
		[Authorize]
        public IHttpActionResult PutProfile(int id, Profile profile)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != profile.Id)
            {
                return BadRequest();
            }

            db.Entry(profile).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProfileExists(id))
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

        // POST api/Profile
		[Authorize]
        [ResponseType(typeof(DTOs.Profile))]
        public IHttpActionResult PostProfile(Profile profile)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Profiles.Add(profile);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = profile.Id }, new DTOs.Profile(profile));
        }

        // DELETE api/Profile/5
		[Authorize]
        [ResponseType(typeof(DTOs.Profile))]
        public IHttpActionResult DeleteProfile(int id)
        {
            Profile profile = db.Profiles.Find(id);
            if (profile == null)
            {
                return NotFound();
            }

            db.Profiles.Remove(profile);
            db.SaveChanges();

            return Ok(new DTOs.Profile(profile));
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ProfileExists(int id)
        {
            return db.Profiles.Count(e => e.Id == id) > 0;
        }
    }
}