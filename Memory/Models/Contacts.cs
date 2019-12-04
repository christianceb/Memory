using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Memory.Models
{
  public class Contacts
  {
    public List<Contact> List { get; set; }

    public Contacts()
    {
      List = new List<Contact>();
    }


    public Contact Add( string name, string number )
    {
      int id = FindId();
      Contact newContact = new Contact(id)
      {
        Name = name,
        Number = number
      };

      List.Add(
        newContact
      );

      return newContact;
    }

    public void AddMessage( Contact contact, string message, string date, string time, string sent )
    {
      bool boolSent = sent == "out" ? true : false;
      int id = FindMessagesId( contact );
      DateTime dateTime = DateTime.Parse( date + " " + time );

      int index = List.FindIndex( c => c.Id == contact.Id );

      Message newMessage = new Message(id)
      {
        Content = message,
        DateTime = dateTime,
        Sent = boolSent
      };

      List[index].Messages.Add( newMessage );
    }

    public Contact FindContact(string number)
    {
      List<Contact> found = List.Where( c => c.Number == number ).ToList();

      if (found.Count > 0)
      {
        return found[0];
      }

      return null;
    }
    public int FindMessagesId( Contact contact )
    {
      int id;
      int tail;

      // Sort list by ID
      List<Message> listSortedID = new List<Message>(
        contact.Messages.OrderBy(m => m.Id).ToList()
      );

      tail = listSortedID.Count;

      if (tail == 0)
      {
        id = 1;
      }
      else
      {
        tail--;
        id = listSortedID[tail].Id + 1;
      }

      return id;
    }

    public void ReorderAll()
    {
      foreach ( Contact contact in List )
      {
        contact.Messages.OrderByDescending(m => m.DateTime);
      }

      List.OrderByDescending(c => c.LastMessage);
    }

    public int FindId()
    {
      int id;
      int tail;

      // Sort list by ID
      List<Contact> listSortedID = new List<Contact>(
        List.OrderBy(j => j.Id).ToList()
      );

      tail = listSortedID.Count;

      if (tail == 0)
      {
        id = 1;
      }
      else
      {
        tail--;
        id = listSortedID[tail].Id + 1;
      }

      return id;
    }
  }
}
