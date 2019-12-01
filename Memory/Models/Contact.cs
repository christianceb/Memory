using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Memory.Models
{
  public class Contact
  {
    public List<Message> Messages { get; set; }

    public DateTime LastMessage
    {
      get
      {
        return new DateTime();
      }
    }

    public string Name { get; set; }
    public string ContactNumber { get; set; }
  }
}
