
import { AgendaItem } from "@/data/agendaData";

// Interface for the response from Gemini API
export interface GeminiResponse {
  meetingType: string;
  description: string;
  agenda: {
    title: string;
    duration: number; // in minutes
    owner: {
      name: string;
    };
  }[];
}

// Function to generate agenda using Google Gemini 2.5 API
export async function generateAgenda(prompt: string): Promise<AgendaItem[]> {
  try {
    // This is where you would add your actual API key
    // For now, let's use a placeholder
    const API_KEY = "YOUR_GEMINI_API_KEY"; 
    const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent";
    
    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `You are a meeting facilitator that helps create structured agendas.
                Based on this meeting description: "${prompt}", 
                analyze the meeting type and create a detailed agenda.
                Return a JSON object with the following structure:
                {
                  "meetingType": "Type of meeting",
                  "description": "Brief description of the meeting purpose",
                  "agenda": [
                    {
                      "title": "Item title",
                      "duration": minutes as number,
                      "owner": { 
                        "name": "Person name"
                      }
                    }
                  ]
                }
                Make sure durations are reasonable and the total meeting time is appropriate for the meeting type.
                Include 4-8 agenda items. Make names realistic and varied.`
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.2,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      }),
    });

    if (!response.ok) {
      throw new Error(`API call failed with status: ${response.status}`);
    }

    const data = await response.json();
    
    // Parse the response text as JSON
    let jsonResponse: GeminiResponse;
    try {
      // The response format might vary, but typically the content is in data.candidates[0].content.parts[0].text
      const responseText = data.candidates[0].content.parts[0].text;
      jsonResponse = JSON.parse(responseText);
    } catch (error) {
      console.error("Failed to parse Gemini response:", error);
      throw new Error("Invalid response format from Gemini API");
    }

    // Transform the Gemini response into our AgendaItem format
    let startTime = new Date();
    startTime.setMinutes(Math.ceil(startTime.getMinutes() / 5) * 5); // Round to nearest 5 minutes
    startTime.setSeconds(0);
    startTime.setMilliseconds(0);
    
    const agendaItems: AgendaItem[] = [];
    
    for (let i = 0; i < jsonResponse.agenda.length; i++) {
      const item = jsonResponse.agenda[i];
      
      // Calculate start and end times
      const itemStartTime = new Date(startTime);
      const endTime = new Date(itemStartTime);
      endTime.setMinutes(itemStartTime.getMinutes() + item.duration);
      
      // Format times
      const startTimeString = itemStartTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const endTimeString = endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      
      // Generate an avatar color based on a simple hash of the owner's name
      const nameHash = item.owner.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const colors = [
        '#6366f1', '#ec4899', '#14b8a6', '#f59e0b', 
        '#8b5cf6', '#ef4444', '#22c55e', '#3b82f6'
      ];
      const avatarColor = colors[nameHash % colors.length];
      
      // Create the agenda item
      const agendaItem: AgendaItem = {
        id: (i + 1).toString(),
        title: item.title,
        startTime: startTimeString,
        endTime: endTimeString,
        duration: item.duration,
        owner: {
          name: item.owner.name,
          initials: item.owner.name
            .split(' ')
            .map(name => name[0])
            .join('')
            .substring(0, 2)
            .toUpperCase(),
          avatarColor: avatarColor,
        },
        isCompleted: false,
      };
      
      agendaItems.push(agendaItem);
      
      // Set the next start time
      startTime = endTime;
    }
    
    return agendaItems;
  } catch (error) {
    console.error("Error generating agenda:", error);
    throw error;
  }
}

// For demo purposes if API key is not available
export async function generateMockAgenda(prompt: string): Promise<AgendaItem[]> {
  console.log("Generating mock agenda for prompt:", prompt);
  
  // Create a simple meeting type classification based on the prompt
  let meetingType = "Team Sync";
  if (prompt.toLowerCase().includes("sprint")) {
    meetingType = "Sprint Planning";
  } else if (prompt.toLowerCase().includes("review")) {
    meetingType = "Project Review";
  } else if (prompt.toLowerCase().includes("设计") || prompt.toLowerCase().includes("design")) {
    meetingType = "Design Review";
  } else if (prompt.toLowerCase().includes("产品") || prompt.toLowerCase().includes("product")) {
    meetingType = "Product Discussion";
  }
  
  // Sample agenda items based on meeting type
  const agendaItems: AgendaItem[] = [];
  let startTime = new Date();
  startTime.setMinutes(Math.ceil(startTime.getMinutes() / 5) * 5);
  startTime.setSeconds(0);
  
  if (meetingType === "Sprint Planning") {
    const items = [
      { title: "Sprint 回顾", duration: 10, owner: { name: "张伟", initials: "ZW", color: "#6366f1" } },
      { title: "产品待办事项评审", duration: 15, owner: { name: "李梅", initials: "LM", color: "#ec4899" } },
      { title: "团队能力评估", duration: 10, owner: { name: "王强", initials: "WQ", color: "#14b8a6" } },
      { title: "冲刺目标确定", duration: 15, owner: { name: "赵丽", initials: "ZL", color: "#f59e0b" } },
      { title: "任务分配", duration: 10, owner: { name: "陈明", initials: "CM", color: "#8b5cf6" } },
    ];
    createAgendaItems(items);
  } else if (meetingType === "Project Review") {
    const items = [
      { title: "项目进展概述", duration: 10, owner: { name: "王华", initials: "WH", color: "#6366f1" } },
      { title: "关键指标回顾", duration: 15, owner: { name: "周杰", initials: "ZJ", color: "#ec4899" } },
      { title: "风险与挑战分析", duration: 15, owner: { name: "刘芳", initials: "LF", color: "#14b8a6" } },
      { title: "客户反馈讨论", duration: 10, owner: { name: "孙明", initials: "SM", color: "#f59e0b" } },
      { title: "下一阶段规划", duration: 10, owner: { name: "郑华", initials: "ZH", color: "#8b5cf6" } },
    ];
    createAgendaItems(items);
  } else if (meetingType === "Design Review") {
    const items = [
      { title: "设计目标回顾", duration: 5, owner: { name: "林设计", initials: "LS", color: "#6366f1" } },
      { title: "用户研究结果", duration: 15, owner: { name: "吴彤", initials: "WT", color: "#ec4899" } },
      { title: "界面设计演示", duration: 20, owner: { name: "陈晓", initials: "CX", color: "#14b8a6" } },
      { title: "可用性测试结果", duration: 10, owner: { name: "方圆", initials: "FY", color: "#f59e0b" } },
      { title: "设计修改与迭代", duration: 10, owner: { name: "黄志", initials: "HZ", color: "#8b5cf6" } },
    ];
    createAgendaItems(items);
  } else {
    const items = [
      { title: "欢迎与介绍", duration: 5, owner: { name: "张主管", initials: "ZZ", color: "#6366f1" } },
      { title: "项目进展更新", duration: 15, owner: { name: "李工程师", initials: "LG", color: "#ec4899" } },
      { title: "问题与挑战", duration: 10, owner: { name: "王产品", initials: "WC", color: "#14b8a6" } },
      { title: "行动项目回顾", duration: 10, owner: { name: "赵测试", initials: "ZC", color: "#f59e0b" } },
      { title: "下周计划讨论", duration: 10, owner: { name: "刘设计", initials: "LS", color: "#8b5cf6" } },
      { title: "问答环节", duration: 10, owner: { name: "张主管", initials: "ZZ", color: "#6366f1" } },
    ];
    createAgendaItems(items);
  }
  
  function createAgendaItems(items: any[]) {
    let currentTime = startTime;
    
    items.forEach((item, index) => {
      const itemStartTime = new Date(currentTime);
      const endTime = new Date(itemStartTime);
      endTime.setMinutes(itemStartTime.getMinutes() + item.duration);
      
      const startTimeString = itemStartTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const endTimeString = endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      
      agendaItems.push({
        id: (index + 1).toString(),
        title: item.title,
        startTime: startTimeString,
        endTime: endTimeString,
        duration: item.duration,
        owner: {
          name: item.owner.name,
          initials: item.owner.initials,
          avatarColor: item.owner.color,
        },
        isCompleted: false,
      });
      
      currentTime = endTime;
    });
  }
  
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => resolve(agendaItems), 1000);
  });
}
