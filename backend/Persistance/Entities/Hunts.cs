using System;
using System.Collections.Generic;

namespace backend.Persistance.Entities
{
    public class Hunts
    {
      public Hunts()
      {
        Clues = new HashSet<Clues>();
      }
      public Guid HuntId { get; set; }
      public string Hunt { get; set; }
      public ICollection<Clues> Clues { get; set; }
    }
}