export type SearchIntent = 'Informational' | 'Commercial' | 'Navigational' | 'Transactional';

export type ImpactLevel = 'High' | 'Medium' | 'Low';
export type EffortLevel = 'High' | 'Medium' | 'Low';
export type StatusSeverity = 'pass' | 'warning' | 'fail';

export interface KeywordItem {
  keyword: string;
  searchVolume: string;
  difficulty: number;
  intent: SearchIntent;
}

export interface RecommendationItem {
  rank: number;
  fixDescription: string;
  category: 'On-Page' | 'Technical' | 'Content' | 'Off-Page';
  impact: ImpactLevel;
  effort: EffortLevel;
  rationale: string;
}

export interface PipelineModuleLog {
  module: string;
  status: 'SUCCESS' | 'WARNING' | 'FAILED';
  latencyMs: number;
  recordsProcessed: number;
  version: string;
  details?: string;
}

export interface AuditReportData {
  targetUrl: string;
  auditedAt: string;
  overallScore: number;
  scores: {
    onPage: number;
    technical: number;
    content: number;
    offPage: number;
  };
  section1_AudienceKeywords: {
    audienceProfile: {
      demographics: string;
      intent: string;
      userGoals: string[];
    };
    painPoints: string[];
    coreNeeds: string[];
    keywords: KeywordItem[];
  };
  section2_OnPage: {
    titleTag: {
      content: string;
      length: number;
      status: StatusSeverity;
      recommendation: string;
    };
    metaDescription: {
      content: string;
      length: number;
      status: StatusSeverity;
      recommendation: string;
    };
    headingHierarchy: {
      h1Count: number;
      h1Text: string[];
      h2Count: number;
      h3Count: number;
      structureValid: boolean;
      observations: string[];
    };
    urlStructure: {
      url: string;
      length: number;
      pathSegments: number;
      hasParams: boolean;
      isHttps: boolean;
      observations: string[];
    };
    imageOptimization: {
      totalImages: number;
      withAlt: number;
      missingAlt: number;
      nextGenFormatPercent: number;
      observations: string[];
    };
  };
  section3_Technical: {
    performance: {
      httpStatus: number;
      responseTimeMs: number;
      ttfbMs: number;
      status: StatusSeverity;
      observations: string[];
    };
    crawlability: {
      sslValid: boolean;
      sslIssuer: string;
      robotsTxtFound: boolean;
      sitemapFound: boolean;
      canonicalPresent: boolean;
      indexable: boolean;
      observations: string[];
    };
    internalLinking: {
      totalInternalLinks: number;
      externalLinks: number;
      brokenLinks: number;
      orphanPagesSuspected: boolean;
      avgLinkDepth: number;
      observations: string[];
    };
  };
  section4_OffPage: {
    domainRating: number;
    urlRating: number;
    backlinksCount: string;
    referringDomains: string;
    dofollowRatio: string;
    organicMonthlyVisits: string;
    bounceRate: string;
    avgPagesPerVisit: string;
    avgSessionDuration: string;
    observations: string[];
  };
  section5_ContentGaps: {
    missingSubtopics: string[];
    unansweredUserQueries: string[];
    depthOpportunities: string[];
    topicalCoverageScore: number;
  };
  section6_PrioritizedRecommendations: RecommendationItem[];
  section7_ExecutionLogs: {
    jobId: string;
    executionStatus: 'COMPLETED' | 'FAILED';
    startTime: string;
    completedTime: string;
    totalDurationMs: number;
    processedModules: PipelineModuleLog[];
    gatewayInfo: {
      clientIp: string;
      protocol: string;
      workerNode: string;
      routeCluster: string;
    };
  };
  markdownReport: string;
}

export interface PipelineStageInfo {
  id: string;
  name: string;
  moduleName: string;
  description: string;
  status: 'idle' | 'running' | 'completed' | 'failed';
  durationMs?: number;
  logSummary?: string;
}
