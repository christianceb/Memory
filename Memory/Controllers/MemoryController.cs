using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using CsvHelper;
using Memory.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Memory.Controllers
{
  public class MemoryController : Controller
  {
    [Route("api/Memory")]
    [HttpPost]
    public ActionResult AddComment( IFormFile File )
    {
      StreamReader streamReader = new StreamReader(File.OpenReadStream());

      List<CSVRow> rawMessages;
      using (CsvReader csv = new CsvReader(streamReader))
      {
        rawMessages = csv.GetRecords<CSVRow>().ToList();
      }

      Contacts contacts = new Contacts();

      foreach ( CSVRow rawMessage in rawMessages )
      {
        Contact found = contacts.FindContact(rawMessage.Number);

        if ( found == null )
        {
          found = contacts.Add( rawMessage.Name, rawMessage.Number );
        }

        contacts.AddMessage( found, rawMessage.Message, rawMessage.Date, rawMessage.Time, rawMessage.Type );
      }

      contacts.ReorderAll();

      return Json( contacts.List );
    }
  }
}
