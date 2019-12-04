using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Memory.Models
{
  public class Message
  {
    public int Id { get; private set; }
    public DateTime DateTime { get; set; }
    public bool Sent { get; set; }
    public string Content { get; set; }

    public Message( int id )
    {
      Id = id;
    }
  }
}
