using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Memory.Models
{
  public class Message
  {
    public int Id { get; set; }
    public string Author { get; set; }
    public DateTime DateTime { get; set; }
    public bool Content { get; set; }
  }
}
