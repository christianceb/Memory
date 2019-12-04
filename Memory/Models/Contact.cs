using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Memory.Models
{
  public class Contact
  {
    public int Id { get; private set; }
    public string Name { get; set; }
    public string Number { get; set; }
    public List<Message> Messages { get; set; }
    public DateTime LastMessage
    {
      get
      {
        int id;
        int tail;

        DateTime lastMessage = DateTime.MinValue;

        List<Message> sortedMessages = new List<Message>(
          Messages.OrderBy(m => m.DateTime).Reverse().ToList()
        );

        tail = sortedMessages.Count;

        if ( tail > 0)
        {
          lastMessage = sortedMessages[(tail - 1)].DateTime;
        }

        return lastMessage;
      }
    }

    public Contact( int id )
    {
      Id = id;

      Messages = new List<Message>();
    }
  }
}
