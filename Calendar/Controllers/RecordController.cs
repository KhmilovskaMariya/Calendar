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
    public class RecordController : ApiController
    {
        private CalendarContext db = new CalendarContext();

        // GET api/Record
		[Authorize(Roles = "admin")]
        public IEnumerable<DTOs.Record> GetRecords()
        {
            return db.Records.ToArray().Select(record => new DTOs.Record(record));
        }

        // GET api/Record/5
		[Authorize]
        [ResponseType(typeof(DTOs.Record))]
        public IHttpActionResult GetRecord(int id)
        {
            Record record = db.Records.Find(id);
            if (record == null)
            {
                return NotFound();
            }

            return Ok(new DTOs.Record(record));
        }

        // PUT api/Record/5
		[Authorize]
        public IHttpActionResult PutRecord(int id, Record record)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != record.Id)
            {
                return BadRequest();
            }

            db.Entry(record).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RecordExists(id))
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

        // POST api/Record
		[Authorize]
        [ResponseType(typeof(DTOs.Record))]
        public IHttpActionResult PostRecord(Record record)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Records.Add(record);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = record.Id }, new DTOs.Record(record));
        }

        // DELETE api/Record/5
		[Authorize]
        [ResponseType(typeof(DTOs.Record))]
        public IHttpActionResult DeleteRecord(int id)
        {
            Record record = db.Records.Find(id);
            if (record == null)
            {
                return NotFound();
            }

            db.Records.Remove(record);
            db.SaveChanges();

            return Ok(new DTOs.Record(record));
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool RecordExists(int id)
        {
            return db.Records.Count(e => e.Id == id) > 0;
        }
    }
}